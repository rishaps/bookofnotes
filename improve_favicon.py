import os
from PIL import Image, ImageFilter

# Possible source paths (checking previous and current uploads)
sources = [
    '/home/zonar/.gemini/antigravity/brain/18bc037c-bcca-4f4d-a50a-70cdc6039e19/uploaded_image_1767519132388.jpg',
    '/home/zonar/.gemini/antigravity/brain/18bc037c-bcca-4f4d-a50a-70cdc6039e19/uploaded_image_1767519231307.png'
]

public_dir = '/home/zonar/projects/bookofnotes/public'

def process_favicon():
    # Find the best source image (largest square)
    best_source = None
    max_res = 0
    img = None

    for s in sources:
        if os.path.exists(s):
            try:
                temp_img = Image.open(s)
                w, h = temp_img.size
                print(f"Checking {s}: {w}x{h}")
                # Prefer larger, squarer images
                if w > max_res and 0.8 < w/h < 1.2:
                   max_res = w
                   best_source = s
                   img = temp_img
            except Exception as e:
                print(f"Error opening {s}: {e}")
    
    if not img:
        print("No valid source image found.")
        return

    print(f"Using source: {best_source}")

    # Ensure clean resizing
    # 1. Save High-Res PNG (512x512) for apple-touch-icon and main favicon.png
    high_res = img.resize((512, 512), resample=Image.Resampling.LANCZOS)
    png_path = os.path.join(public_dir, 'favicon.png')
    high_res.save(png_path, format='PNG')
    print(f"Saved High-Res PNG: {png_path}")

    # 2. Create ICO with multiple sizes, applying sharpening to small ones
    ico_sizes = []
    for size in [16, 32, 48, 64, 128, 256]:
        # Resize down
        resized = img.resize((size, size), resample=Image.Resampling.LANCZOS)
        
        # Apply slight sharpening for very small icons to keep text crisp
        if size <= 32:
            resized = resized.filter(ImageFilter.SHARPEN)
        
        ico_sizes.append(resized)

    ico_path = os.path.join(public_dir, 'favicon.ico')
    # Save as ICO containing all layers
    # Use the first image `save` method, appending others
    ico_sizes[0].save(
        ico_path, 
        format='ICO', 
        sizes=[(i.width, i.height) for i in ico_sizes],
        append_images=ico_sizes[1:]
    )
    print(f"Saved Multi-Layer ICO: {ico_path}")

if __name__ == "__main__":
    process_favicon()
