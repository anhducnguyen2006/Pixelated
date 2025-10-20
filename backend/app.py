from PIL import Image
import sys

def pixelate_image(input_path, output_path, pixel_size):
    # Ensure pixel_size is at least 1
    pixel_size = max(1, int(pixel_size))
    # Open an image file
    with Image.open(input_path) as img:
        # Compute downscale dimensions and ensure minimum of 1x1
        down_w = max(1, img.size[0] // pixel_size)
        down_h = max(1, img.size[1] // pixel_size)
        # Resize down by a factor of pixel_size, then back up to original size
        small_img = img.resize((down_w, down_h), Image.NEAREST)
        pixelated_img = small_img.resize(img.size, Image.NEAREST)
        # Save the pixelated image
        pixelated_img.save(output_path, format="PNG")

if __name__ == "__main__":
    input_image = 'uploads/input.png'
    output_image = 'uploads/output.png'

    # Get the pixel size from command-line argument (default is 10)
    try:
        pixel_size = int(sys.argv[1]) if len(sys.argv) > 1 else 10
    except Exception:
        pixel_size = 10

    pixelate_image(input_image, output_image, pixel_size)
    print("Image pixelated successfully.")
