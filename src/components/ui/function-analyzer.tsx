"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";

interface FunctionInfo {
  name: string;
  signature: string;
  intent: string;
  images: string[];
}

interface FunctionAnalyzerProps {
  jsonData: any;
}

export function FunctionAnalyzer({ jsonData }: FunctionAnalyzerProps) {
  const analyzeFunctions = (): FunctionInfo[] => {
    if (!jsonData?.display?.formats) return [];

    const functions: FunctionInfo[] = [];
    const formats = jsonData.display.formats;

    for (const [signature, data] of Object.entries(formats)) {
      const functionName = signature.split('(')[0];
      const intent = (data as any).intent || '';
      
      // Map function names to available images
      const getImagesForFunction = (name: string): string[] => {
        const imageMap: Record<string, string[]> = {
          'approve': ['/img/Approve1.png', '/img/Approve2.png'],
          'mint': ['/img/Mint1.png', '/img/Mint2.png'],
          'transfer': ['/img/Transfer1.png', '/img/Transfer2.png', '/img/Transfer3.png'],
          'burn': ['/img/Burn1.png', '/img/Burn2.png'],
        };
        
        return imageMap[name.toLowerCase()] || [];
      };

      functions.push({
        name: functionName,
        signature,
        intent,
        images: getImagesForFunction(functionName)
      });
    }

    return functions;
  };

  const functions = analyzeFunctions();
  const legalName = jsonData?.metadata?.info?.legalName || 'Unknown';

  if (functions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Function Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No functions detected in the uploaded JSON. Make sure the JSON contains a "display.formats" section with function definitions.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detected Functions ({functions.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {functions.map((func, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-sm">
                {func.name}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {func.signature}
              </span>
            </div>
            
            {func.intent && (
              <p className="mb-3 text-sm text-muted-foreground">
                <strong>Intent:</strong> {func.intent}
              </p>
            )}
            
            {func.images.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Preview Images:</p>
                <div className="flex gap-2 overflow-x-auto">
                  {func.images.map((imagePath, imgIndex) => (
                    <div key={imgIndex} className="flex-shrink-0 relative">
                      <img
                        src={imagePath}
                        alt={`${func.name} preview ${imgIndex + 1}`}
                        className="h-72 w-auto rounded border object-contain shadow-sm"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {legalName}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {imgIndex + 1} of {func.images.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}