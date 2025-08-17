"use client";

import { useState, useRef } from "react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Label } from "./label";
import { FunctionAnalyzer } from "./function-analyzer";

interface JsonFileUploadProps {
  onJsonLoad?: (json: object) => void;
}

export function JsonFileUpload({ onJsonLoad }: JsonFileUploadProps) {
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [parsedJson, setParsedJson] = useState<object | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setError("Please select a JSON file");
      return;
    }

    setFileName(file.name);
    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        handleJsonContent(content);
      }
    };
    reader.onerror = () => {
      setError("Error reading file");
    };
    reader.readAsText(file);
  };

  const handleJsonContent = (content: string) => {
    try {
      const parsed = JSON.parse(content) as object;
      setError("");
      setIsValid(true);
      setParsedJson(parsed);
      onJsonLoad?.(parsed);
    } catch {
      setError("Invalid JSON format");
      setIsValid(false);
      setParsedJson(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearContent = () => {
    setFileName("");
    setError("");
    setIsValid(false);
    setParsedJson(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            JSON File Preview
            {fileName && (
              <Button onClick={clearContent} variant="outline" size="sm">
                Clear
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Upload a JSON file to analyze functions and preview images
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload JSON File</Label>
            <div className="flex gap-2">
              <Button 
                onClick={handleUploadClick} 
                variant="outline" 
                className="w-full"
              >
                {fileName || "Choose JSON File"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          {isValid && (
            <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
              ✓ Valid JSON format
            </div>
          )}
        </CardContent>
      </Card>

      {parsedJson && <FunctionAnalyzer jsonData={parsedJson} />}
    </div>
  );
}