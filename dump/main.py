import torch
from diffusers.pipelines.stable_diffusion.pipeline_stable_diffusion import StableDiffusionPipeline
from PIL import Image
from flask import Flask, request, jsonify
import cloudinary
import cloudinary.api
from cloudinary.uploader import upload

cloudinary.config(
    cloud_name="dn6otpsy6",
    api_key="949995475842691",
    api_secret="WiTQXK0jqzEaHRoOvMiOpBJWUCQ",
    secure=True,
)

app = Flask(__name__)

# Model and device setup (as before)
modelid = "CompVis/stable-diffusion-v1-4"
device = "cpu"  # Change to "cuda" if you have a compatible GPU
pipe = StableDiffusionPipeline.from_pretrained(
    modelid, revision="fp16", use_auth_token="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"
)
pipe.to(device)

@app.route("/generate_image", methods=["POST"])
def generate_image_api():
    prompt = request.json.get("prompt")

    if prompt:
        try:
            image = generate_image(prompt)  # Call the image generation function
            image_url = upload(image)  # Upload image to online storage
            return jsonify({"image_url": image_url}), 200
            # image.save(prompt[4])
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Prompt is required"}), 400

def generate_image(prompt):
    """Generates an image using the Stable Diffusion model."""
    output = pipe(prompt, guidance_scale=8.5)
    image = output["images"][0]
    return image

if __name__ == "__main__":
    app.run(debug=False)  # Set debug=False for production
