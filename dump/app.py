import torch
from torch.amp.autocast_mode import autocast
from diffusers.pipelines.stable_diffusion.pipeline_stable_diffusion import StableDiffusionPipeline
from PIL import Image  # To save the generated image

# Model and device setup
modelid = "CompVis/stable-diffusion-v1-4"
device = "cpu"
pipe = StableDiffusionPipeline.from_pretrained(modelid, variant="fp16", use_auth_token="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")
pipe.to(device)

def generate_image(prompt):
    """Generates an image using the Stable Diffusion model."""
    output = pipe(prompt, guidance_scale=8.5)
    image = output["images"][0]
    image.save('generatedimage.png')

# Example usage
prompt = "A horny girl on period cramps"
generate_image(prompt)