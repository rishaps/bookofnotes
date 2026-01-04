#!/usr/bin/env python3
"""
Script to fix LaTeX equation numbers - add spacing before the tag to prevent overlap.
"""

import re

def fix_tag_spacing(content):
    """
    Add spacing before \tag{} to prevent overlap with equation content.
    Converts \\tag{X.Y} to \\qquad \\tag{X.Y}
    """
    # Pattern to match: \tag{X.Y} without preceding \qquad or \quad
    # We need to add \qquad before the tag
    
    # Match \\tag{...} that is NOT preceded by \\quad or \\qquad
    pattern = r'(?<!\\quad\s)(?<!\\qquad\s)\\\\tag\{([^}]+)\}'
    
    def replace_func(match):
        equation_number = match.group(1)
        # Add \qquad for spacing before the tag
        return f'\\\\qquad \\\\tag{{{equation_number}}}'
    
    fixed_content = re.sub(pattern, replace_func, content)
    
    # Count changes
    original_count = len(re.findall(r'\\\\tag\{', content))
    
    return fixed_content, original_count

def main():
    input_file = 'data/courseContent-fisica.ts'
    
    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("Adding spacing before equation tags...")
    fixed_content, count = fix_tag_spacing(content)
    
    print(f"Writing fixed content back to {input_file}...")
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"Done! Added spacing to {count} equation tags.")

if __name__ == '__main__':
    main()
