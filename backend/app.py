from PIL import Image
import sys

def pixelate_image(input_path, output_path, pixel_size):
    # Open an image file
    with Image.open(input_path) as img:
        # Resize down by a factor of pixel_size, then back up to original size
        small_img = img.resize(
            (img.size[0] // pixel_size, img.size[1] // pixel_size), Image.NEAREST
        )
        pixelated_img = small_img.resize(img.size, Image.NEAREST)
        # Save the pixelated image
        pixelated_img.save(output_path, format="PNG")

if __name__ == "__main__":
    input_image = 'uploads/input.png'
    output_image = 'uploads/output.png'

    # Get the pixel size from command-line argument (default is 10)
    pixel_size = int(sys.argv[1]) if len(sys.argv) > 1 else 10

    pixelate_image(input_image, output_image, pixel_size)
    print("Image pixelated successfully.")
