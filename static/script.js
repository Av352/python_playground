// static/script.js

document.getElementById("runButton").addEventListener("click", async () => {
    const code = document.getElementById("codeInput").value;
    const outputArea = document.getElementById("outputArea");
    outputArea.textContent = "⏳ Running...";
    try {
        const response = await fetch("/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });
        const data = await response.json();
        outputArea.textContent = data.output || "⚠️ No output.";
    } catch (error) {
        outputArea.textContent = "❌ Error running code.";
    }
});

const textarea = document.getElementById("codeInput");
textarea.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const code = textarea.value;
        const cursorPos = textarea.selectionStart;
        const before = code.slice(0, cursorPos);
        const after = code.slice(cursorPos);
        const lastLine = before.slice(before.lastIndexOf("\n") + 1);
        const indent = lastLine.match(/^\s*/)[0];
        if (lastLine.trim().endsWith(":")) {
            e.preventDefault();
            const newIndent = indent + "    ";
            textarea.value = before + "\n" + newIndent + after;
            textarea.selectionStart = textarea.selectionEnd = before.length + 1 + newIndent.length;
        }
    }
});
