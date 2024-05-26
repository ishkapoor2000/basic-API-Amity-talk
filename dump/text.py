import flask
from transformers import pipeline
import os
os.environ["HF_API_KEY"] = "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"  # Replace with your actual API key

app = flask.Flask(__name__)
# generator = pipeline("text-generation", model="EleutherAI/gpt-neo-125M")  # Using a different model
generator = pipeline("text-generation", model="EleutherAI/gpt-neo-1.3B")  # Using a different model

@app.route("/")
def home():
    return "http://localhost:5050/generate_text"

@app.route("/generate_text", methods=["POST"])
def generate_text():
    prompt = flask.request.json.get("prompt")

    if prompt:
        try:
            response = generator(prompt, max_length=150, num_return_sequences=1)[0]["generated_text"]
            return flask.jsonify({"response": response}), 200
        except Exception as e:
            return flask.jsonify({"error": f"Failed to generate text: {str(e)}"}), 500
    else:
        return flask.jsonify({"error": "Prompt is required"}), 400

if __name__ == "__main__":
    print("started")
    app.run(debug=True)  # Set debug=False for production
