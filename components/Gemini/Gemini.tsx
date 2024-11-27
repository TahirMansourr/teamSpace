"use client";
import { useState } from "react";
import { Modal, Textarea, Button } from "@mantine/core";
import { IconBrain } from "@tabler/icons-react";

export default function Gemini() {
  const [opened, setOpened] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
      } else {
        setOutput(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconBrain
        size={24}
        className="cursor-pointer hover:text-blue-500 transition-colors"
        onClick={() => setOpened(true)}
      />

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Ask AI Assistant"
        size="lg"
        centered
      >
        <div className="space-y-4">
          <Textarea
            placeholder="Ask me anything..."
            minRows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            className="w-full"
          />

          <Button
            onClick={generateText}
            loading={loading}
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            {loading ? "Generating..." : "Ask Question"}
          </Button>

          {output && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-wrap">{output}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
