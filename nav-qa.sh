#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════════
# EQGenix Site — Nav QA Validation
# ══════════════════════════════════════════════════════════════════════
#
# PURPOSE:
#   Runs before every deployment to catch the silent drift bugs that
#   have hit this site:
#     • Missing nav links (Diagnostic disappeared from Principal, etc.)
#     • Ghost CTA injections (stray Schedule buttons in nav/footer)
#     • Broken cross-page links (pre-order href drift)
#     • Inconsistent footer structure
#     • Missing Pre-Order Book or Inquire CTAs
#
# USAGE:
#   cd /path/to/site && bash nav-qa.sh
#
# EXIT CODES:
#   0 — all checks pass, safe to deploy
#   1 — one or more checks failed, DO NOT DEPLOY
#
# HOW TO RUN BEFORE EVERY DEPLOY:
#   Add to your Netlify build command (netlify.toml):
#     [build]
#       command = "bash nav-qa.sh && <existing-build-command>"
#   OR run it manually before git push.
# ══════════════════════════════════════════════════════════════════════

set -uo pipefail

# Config
PREORDER_HREF="sacred-deposits.html"
# Pages that don't follow the main-site nav pattern (different structure)
EXCLUDE=(
  "sacred-deposits.html"   # dedicated book landing page, uses sd-nav
)
# Expected nav links on every main page (6 total)
EXPECTED_LINKS=("thesis.html" "framework.html" "advisory.html" "research.html" "principal.html" "assessment.html")

# Colors
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'

# Counters
PASS=0; FAIL=0; WARN=0
FAILED_FILES=()

# Helper: is file in exclude list?
is_excluded() {
  local f="$1"
  for ex in "${EXCLUDE[@]}"; do
    [[ "$(basename "$f")" == "$ex" ]] && return 0
  done
  return 1
}

# Helper: log fail
fail() {
  echo -e "  ${RED}✗${NC} $1"
  FAIL=$((FAIL + 1))
}
pass() {
  echo -e "  ${GREEN}✓${NC} $1"
  PASS=$((PASS + 1))
}
warn() {
  echo -e "  ${YELLOW}!${NC} $1"
  WARN=$((WARN + 1))
}

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  EQGenix Site — Nav QA Validation${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

# Get list of HTML files in current directory
shopt -s nullglob
html_files=( *.html )
if [[ ${#html_files[@]} -eq 0 ]]; then
  echo -e "${RED}ERROR: No HTML files found in $(pwd). Run from site root.${NC}"
  exit 1
fi

# Per-file validation
for file in "${html_files[@]}"; do
  if is_excluded "$file"; then
    echo -e "${YELLOW}→ $file${NC} (excluded — different nav structure)"
    continue
  fi

  echo -e "${BLUE}→ $file${NC}"
  file_failed=0

  # CHECK 1 — all 6 expected nav links exist IN THE NAV BLOCK (not just anywhere in the file)
  # This catches the exact bug where Diagnostic got dropped from nav but kept in footer
  nav_block=$(sed -n '/<nav[^>]*id="mainNav"/,/<\/nav>/p' "$file")
  if [[ -z "$nav_block" ]]; then
    # Fallback for pages without id="mainNav" — use first nav element
    nav_block=$(sed -n '/<nav\b/,/<\/nav>/p' "$file" | head -50)
  fi
  for link in "${EXPECTED_LINKS[@]}"; do
    if ! echo "$nav_block" | grep -q "href=\"$link\""; then
      fail "Missing nav link in <nav>: $link (may still be in footer, but nav is broken)"
      file_failed=1
    fi
  done

  # CHECK 2 — Pre-Order Book CTA present
  if ! grep -q "nav-preorder" "$file"; then
    fail "Missing Pre-Order Book CTA (.nav-preorder)"
    file_failed=1
  fi

  # CHECK 3 — Inquire CTA present
  if ! grep -q "nav-inquiry" "$file"; then
    fail "Missing Inquire CTA (.nav-inquiry)"
    file_failed=1
  fi

  # CHECK 4 — pre-order href points to correct file
  if grep -q "sacred-deposits-final-7\|sacred-deposits-final" "$file"; then
    fail "Stale pre-order href (should be $PREORDER_HREF)"
    file_failed=1
  fi
  if grep -q 'nav-preorder' "$file" && ! grep -q "href=\"$PREORDER_HREF\"" "$file"; then
    fail "Pre-Order button exists but doesn't link to $PREORDER_HREF"
    file_failed=1
  fi

  # CHECK 5 — mobile toggle present
  if ! grep -q "mobile-toggle\|mobileToggle" "$file"; then
    warn "No mobile toggle found (intentional on simple pages, check if expected)"
  fi

  # CHECK 6 — footer brand present
  if ! grep -q "footer-brand\|sd-footer-brand" "$file"; then
    warn "No footer brand found"
  fi

  # CHECK 7 — scan for ghost button injection signature (stray <br><br> between nav/footer elements)
  # Look for <br><br> that appears within nav or right before branded anchor elements
  if grep -qE '<nav[^>]*>.*<br><br>' "$file" 2>/dev/null; then
    fail "Ghost injection detected: <br><br> inside <nav>"
    file_failed=1
  fi
  # Look for suspicious patterns: gold styled button followed by <br><br> followed by brand anchor
  if grep -Pzo 'background:var\(--gold\)[^>]*>Schedule a Consultation</a>\s*<br><br>\s*<a[^>]*class="(nav-brand|footer-brand)"' "$file" > /dev/null 2>&1; then
    fail "Ghost injection detected: Schedule CTA before brand anchor (layout breaker)"
    file_failed=1
  fi

  # CHECK 8 — unbalanced HTML tags sanity check (rough — catches major breakage)
  open_tags=$(grep -oE '<(div|section|nav|footer|ul|li)\b' "$file" | wc -l)
  close_tags=$(grep -oE '</(div|section|nav|footer|ul|li)>' "$file" | wc -l)
  diff=$((open_tags - close_tags))
  if [[ $diff -ne 0 ]]; then
    warn "Unbalanced major tags: $open_tags opened, $close_tags closed (diff: $diff) — inspect manually"
  fi

  if [[ $file_failed -eq 0 ]]; then
    pass "All checks passed"
  else
    FAILED_FILES+=("$file")
  fi
  echo ""
done

# Cross-file consistency: every page should have identical number of each expected link
echo -e "${BLUE}→ Cross-file consistency${NC}"
expected_count=$((${#html_files[@]} - ${#EXCLUDE[@]}))
for link in "${EXPECTED_LINKS[@]}"; do
  # Count pages that have at least one reference to this link
  pages_with_link=0
  for f in "${html_files[@]}"; do
    if is_excluded "$f"; then continue; fi
    if grep -q "href=\"$link\"" "$f"; then
      pages_with_link=$((pages_with_link + 1))
    fi
  done
  if [[ $pages_with_link -eq $expected_count ]]; then
    pass "$link present on all $expected_count main pages"
  else
    fail "$link missing from $((expected_count - pages_with_link)) page(s)"
  fi
done

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  SUMMARY${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "  ${GREEN}Passed:${NC}  $PASS"
echo -e "  ${RED}Failed:${NC}  $FAIL"
echo -e "  ${YELLOW}Warned:${NC}  $WARN"
echo ""

if [[ $FAIL -gt 0 ]]; then
  echo -e "${RED}✗ QA FAILED — Do not deploy.${NC}"
  echo -e "${RED}  Failed files:${NC}"
  for f in "${FAILED_FILES[@]}"; do
    echo -e "    • $f"
  done
  exit 1
else
  echo -e "${GREEN}✓ QA PASSED — Safe to deploy.${NC}"
  exit 0
fi
