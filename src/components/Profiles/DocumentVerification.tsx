"use client";

import type React from "react";

import { useState } from "react";
import { useBlockchain } from "@/components/blockchain/BlockchainContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  CheckCircle,
  FileText,
  Calendar,
  User,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DocumentVerificationProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentVerification = ({
  isOpen,
  onClose,
}: DocumentVerificationProps) => {
  const { userData, verifyDocument, loading } = useBlockchain();
  const [activeTab, setActiveTab] = useState("verified");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("passport");
  const [verifying, setVerifying] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleVerify = async () => {
    if (!selectedFile) return;

    setVerifying(true);
    try {
      await verifyDocument(selectedFile, documentType);
      setSelectedFile(null);
      setActiveTab("verified");
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setVerifying(false);
    }
  };

  const openTransaction = (txHash: string) => {
    // In a real implementation, this would open the transaction on Etherscan or similar
    window.open(
      `https://edu-chain-testnet.blockscout.com/tx/${txHash}`,
      "_blank"
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Document Verification
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="verified">Verified Documents</TabsTrigger>
            <TabsTrigger value="verify">Verify New Document</TabsTrigger>
          </TabsList>

          {/* Verified Documents Tab */}
          <TabsContent value="verified" className="space-y-4">
            {userData?.verifiedDocuments &&
            userData.verifiedDocuments.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {userData.verifiedDocuments.map((doc) => (
                  <Card key={doc.hash} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{doc.name}</CardTitle>
                          <CardDescription>
                            Document Type:{" "}
                            {doc.type.charAt(0).toUpperCase() +
                              doc.type.slice(1)}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={doc.isVerified ? "default" : "destructive"}
                          className="ml-2"
                        >
                          {doc.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm space-y-2">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          Verified{" "}
                          {formatDistanceToNow(doc.timestamp, {
                            addSuffix: true,
                          })}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <User className="mr-2 h-4 w-4" />
                          Verified by: {doc.verifiedBy.slice(0, 6)}...
                          {doc.verifiedBy.slice(-4)}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <FileText className="mr-2 h-4 w-4" />
                          Hash: {doc.hash.slice(0, 10)}...{doc.hash.slice(-8)}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => openTransaction(doc.transactionHash)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Blockchain
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">
                  No verified documents
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You haven&apos;t verified any documents yet. Go to the
                  &apos;Verify New Document&apos; tab to get started.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Verify New Document Tab */}
          <TabsContent value="verify" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Select Document Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Button
                    variant={
                      documentType === "passport" ? "default" : "outline"
                    }
                    onClick={() => setDocumentType("passport")}
                    className="justify-start"
                  >
                    Passport
                  </Button>
                  <Button
                    variant={documentType === "id" ? "default" : "outline"}
                    onClick={() => setDocumentType("id")}
                    className="justify-start"
                  >
                    ID Card
                  </Button>
                  <Button
                    variant={
                      documentType === "certificate" ? "default" : "outline"
                    }
                    onClick={() => setDocumentType("certificate")}
                    className="justify-start"
                  >
                    Certificate
                  </Button>
                  <Button
                    variant={documentType === "diploma" ? "default" : "outline"}
                    onClick={() => setDocumentType("diploma")}
                    className="justify-start"
                  >
                    Diploma
                  </Button>
                  <Button
                    variant={
                      documentType === "financial" ? "default" : "outline"
                    }
                    onClick={() => setDocumentType("financial")}
                    className="justify-start"
                  >
                    Financial
                  </Button>
                  <Button
                    variant={documentType === "other" ? "default" : "outline"}
                    onClick={() => setDocumentType("other")}
                    className="justify-start"
                  >
                    Other
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload Document</h3>
                <div className="border rounded-md p-4">
                  {selectedFile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedFile(null)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileText className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, PNG, JPG or JPEG (MAX. 10MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Verification Process</h3>
                <div className="bg-gray-50 rounded-md p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Document Hashing</h4>
                      <p className="text-sm text-muted-foreground">
                        Your document will be hashed using SHA-256 algorithm.
                        The hash is a unique fingerprint of your document.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Blockchain Storage</h4>
                      <p className="text-sm text-muted-foreground">
                        The document hash will be stored on the blockchain,
                        creating a permanent, tamper-proof record.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        Your document can be verified at any time by comparing
                        its hash with the one stored on the blockchain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  onClick={handleVerify}
                  disabled={!selectedFile || verifying || loading}
                >
                  {verifying || loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Document"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentVerification;
