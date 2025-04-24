from flask import Flask, render_template, request, jsonify
import sys
import io
import contextlib

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/run", methods=["POST"])
def run_code():
    code = request.json.get("code", "")
    output = io.StringIO()
    try:
        with contextlib.redirect_stdout(output):
            exec(code, {'__name__': '__main__'})
    except Exception as e:
        return jsonify({"output": f"❌ Error: {str(e)}"})
    return jsonify({"output": output.getvalue()})
