"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Upload, X, CheckCircle, Shield } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useBlockchain } from "@/components/blockchain/BlockchainContext";

// Define types here directly instead of importing from separate file
type BasicInfoInput = {
  fullname: string;
  gmail: string;
  phone: string;
  permanentAddress: string;
  religion: string;
  dateOfBirth: string;
  sex: string;
  passportCode: string;
  passportExpiralDate: string;
  nationality: string;
};

type GridInfoInput = {
  passport: string;
  maritalStatus: string;
  family: string;
  budget: string;
};

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

const UpdateProfileModal = ({
  isOpen,
  onClose,
  loading: externalLoading,
}: UpdateProfileModalProps) => {
  const {
    userData,
    saveAllData,
    verifyDocument,
    loading: blockchainLoading,
  } = useBlockchain();
  const [basicInfo, setBasicInfo] = useState<BasicInfoInput>({
    fullname: userData?.basicInfo?.fullname || "",
    gmail: userData?.basicInfo?.gmail || "",
    phone: userData?.basicInfo?.phone || "",
    permanentAddress: userData?.basicInfo?.permanentAddress || "",
    religion: userData?.basicInfo?.religion || "",
    dateOfBirth: userData?.basicInfo?.dateOfBirth || "",
    sex: userData?.basicInfo?.sex || "",
    passportCode: userData?.basicInfo?.passportCode || "",
    passportExpiralDate: userData?.basicInfo?.passportExpiralDate || "",
    nationality: userData?.basicInfo?.nationality || "",
  });
  const [gridInfo, setGridInfo] = useState<GridInfoInput>({
    passport: userData?.gridInfo?.passport || "",
    maritalStatus: userData?.gridInfo?.maritalStatus || "",
    family: userData?.gridInfo?.family || "",
    budget: userData?.gridInfo?.budget || "",
  });
  const [roadmapContent, setRoadmapContent] = useState(userData?.roadmap || "");
  const [activeTab, setActiveTab] = useState("basic");
  const [files, setFiles] = useState<Record<string, File | null>>({
    passportFile: null,
    familyPhoto: null,
    budgetDocument: null,
  });
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [verifiedHashes, setVerifiedHashes] = useState<Record<string, string>>(
    {}
  );
  const [loading, setLoading] = useState(externalLoading || blockchainLoading);

  useEffect(() => {
    if (userData) {
      setBasicInfo({
        fullname: userData.basicInfo?.fullname || "",
        gmail: userData.basicInfo?.gmail || "",
        phone: userData.basicInfo?.phone || "",
        permanentAddress: userData.basicInfo?.permanentAddress || "",
        religion: userData.basicInfo?.religion || "",
        dateOfBirth: userData.basicInfo?.dateOfBirth || "",
        sex: userData.basicInfo?.sex || "",
        passportCode: userData.basicInfo?.passportCode || "",
        passportExpiralDate: userData.basicInfo?.passportExpiralDate || "",
        nationality: userData.basicInfo?.nationality || "",
      });
      setGridInfo({
        passport: userData.gridInfo?.passport || "",
        maritalStatus: userData.gridInfo?.maritalStatus || "",
        family: userData.gridInfo?.family || "",
        budget: userData.gridInfo?.budget || "",
      });
      setRoadmapContent(userData.roadmap || "");
    }
  }, [userData, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes("basic-")) {
      const key = name.replace("basic-", "") as keyof BasicInfoInput;
      setBasicInfo((prev: BasicInfoInput) => ({ ...prev, [key]: value }));
    } else if (name.includes("grid-")) {
      const key = name.replace("grid-", "") as keyof GridInfoInput;
      setGridInfo((prev: GridInfoInput) => ({ ...prev, [key]: value }));
    } else if (name === "roadmap") {
      setRoadmapContent(value);
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    if (field.includes("basic-")) {
      const key = field.replace("basic-", "") as keyof BasicInfoInput;
      setBasicInfo((prev: BasicInfoInput) => ({ ...prev, [key]: value }));
    } else if (field.includes("grid-")) {
      const key = field.replace("grid-", "") as keyof GridInfoInput;
      setGridInfo((prev: GridInfoInput) => ({ ...prev, [key]: value }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles((prev) => ({ ...prev, [field]: file }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [field]: previewUrl }));

      // Reset verification status when file changes
      setVerifiedHashes((prev) => {
        const newHashes = { ...prev };
        delete newHashes[field];
        return newHashes;
      });
    }
  };

  const removeFile = (field: string) => {
    setFiles((prev) => ({ ...prev, [field]: null }));

    // Revoke object URL to avoid memory leaks
    if (previews[field]) {
      URL.revokeObjectURL(previews[field]);
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[field];
        return newPreviews;
      });
    }

    // Remove verification status
    setVerifiedHashes((prev) => {
      const newHashes = { ...prev };
      delete newHashes[field];
      return newHashes;
    });
  };

  const handleVerifyDocument = async (field: string) => {
    const file = files[field];
    if (!file) return;

    try {
      const documentType =
        field === "passportFile"
          ? "passport"
          : field === "familyPhoto"
          ? "family"
          : "budget";

      const hash = await verifyDocument(file, documentType);
      setVerifiedHashes((prev) => ({ ...prev, [field]: hash }));
    } catch (error) {
      console.error("Error verifying document:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    try {
      await saveAllData(basicInfo, gridInfo, roadmapContent);
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Error saving data:", error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false); // Ensure loading is set to false after submission
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update Profile Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-4 w-full text-xs sm:text-sm">
              <TabsTrigger
                value="basic"
                className="px-1 py-1.5 sm:px-3 sm:py-2"
              >
                Basic
              </TabsTrigger>
              <TabsTrigger
                value="additional"
                className="px-1 py-1.5 sm:px-3 sm:py-2"
              >
                Additional
              </TabsTrigger>
              <TabsTrigger
                value="roadmap"
                className="px-1 py-1.5 sm:px-3 sm:py-2"
              >
                Roadmap
              </TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic-fullname">Full Name</Label>
                    <Input
                      id="basic-fullname"
                      name="basic-fullname"
                      value={basicInfo.fullname || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basic-gmail">Email</Label>
                    <Input
                      id="basic-gmail"
                      name="basic-gmail"
                      type="email"
                      value={basicInfo.gmail || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basic-phone">Phone</Label>
                    <Input
                      id="basic-phone"
                      name="basic-phone"
                      type="tel"
                      value={basicInfo.phone || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basic-permanentAddress">
                      Permanent Address
                    </Label>
                    <Input
                      id="basic-permanentAddress"
                      name="basic-permanentAddress"
                      value={basicInfo.permanentAddress || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basic-religion">Religion</Label>
                    <Select
                      value={basicInfo.religion || ""}
                      onValueChange={(value) =>
                        handleSelectChange("basic-religion", value)
                      }
                    >
                      <SelectTrigger id="basic-religion">
                        <SelectValue placeholder="Select Religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buddhism">Buddhism</SelectItem>
                        <SelectItem value="christianity">
                          Christianity
                        </SelectItem>
                        <SelectItem value="hinduism">Hinduism</SelectItem>
                        <SelectItem value="islam">Islam</SelectItem>
                        <SelectItem value="judaism">Judaism</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic-dateOfBirth">Date of Birth</Label>
                    <Input
                      id="basic-dateOfBirth"
                      name="basic-dateOfBirth"
                      type="date"
                      value={basicInfo.dateOfBirth || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basic-sex">Sex</Label>
                    <Select
                      value={basicInfo.sex || ""}
                      onValueChange={(value) =>
                        handleSelectChange("basic-sex", value)
                      }
                    >
                      <SelectTrigger id="basic-sex">
                        <SelectValue placeholder="Select Sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basic-passportCode">Passport Code</Label>
                    <Input
                      id="basic-passportCode"
                      name="basic-passportCode"
                      value={basicInfo.passportCode || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basic-passportExpiralDate">
                      Passport Expiry Date
                    </Label>
                    <Input
                      id="basic-passportExpiralDate"
                      name="basic-passportExpiralDate"
                      type="date"
                      value={basicInfo.passportExpiralDate || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basic-nationality">Nationality</Label>
                    <Select
                      value={basicInfo.nationality || ""}
                      onValueChange={(value) =>
                        handleSelectChange("basic-nationality", value)
                      }
                    >
                      <SelectTrigger id="basic-nationality">
                        <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vietnam">Vietnam</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="korea">South Korea</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                        <SelectItem value="thailand">Thailand</SelectItem>
                        <SelectItem value="malaysia">Malaysia</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent value="additional" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Passport Document</Label>
                    {files.passportFile && !verifiedHashes.passportFile && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyDocument("passportFile")}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Verify on Blockchain
                      </Button>
                    )}
                  </div>
                  <div className="border rounded-md p-4">
                    {previews.passportFile ? (
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={previews.passportFile || "/placeholder.svg"}
                              alt="Passport preview"
                              width={100}
                              height={100}
                              className="object-cover rounded-md"
                            />
                            <div>
                              <div className="flex items-center">
                                <span className="text-sm">
                                  {files.passportFile?.name}
                                </span>
                                {verifiedHashes.passportFile && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-green-50"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              {verifiedHashes.passportFile && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Hash:{" "}
                                  {verifiedHashes.passportFile.slice(0, 10)}...
                                  {verifiedHashes.passportFile.slice(-8)}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile("passportFile")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
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
                            onChange={(e) =>
                              handleFileChange(e, "passportFile")
                            }
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grid-maritalStatus">Marital Status</Label>
                  <Select
                    value={gridInfo.maritalStatus || ""}
                    onValueChange={(value) =>
                      handleSelectChange("grid-maritalStatus", value)
                    }
                  >
                    <SelectTrigger id="grid-maritalStatus">
                      <SelectValue placeholder="Select Marital Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Family Photo</Label>
                    {files.familyPhoto && !verifiedHashes.familyPhoto && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyDocument("familyPhoto")}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Verify on Blockchain
                      </Button>
                    )}
                  </div>
                  <div className="border rounded-md p-4">
                    {previews.familyPhoto ? (
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={previews.familyPhoto || "/placeholder.svg"}
                              alt="Family photo preview"
                              width={100}
                              height={100}
                              className="object-cover rounded-md"
                            />
                            <div>
                              <div className="flex items-center">
                                <span className="text-sm">
                                  {files.familyPhoto?.name}
                                </span>
                                {verifiedHashes.familyPhoto && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-green-50"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              {verifiedHashes.familyPhoto && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Hash:{" "}
                                  {verifiedHashes.familyPhoto.slice(0, 10)}...
                                  {verifiedHashes.familyPhoto.slice(-8)}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile("familyPhoto")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG or JPEG (MAX. 10MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg"
                            onChange={(e) => handleFileChange(e, "familyPhoto")}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Budget Document</Label>
                    {files.budgetDocument && !verifiedHashes.budgetDocument && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyDocument("budgetDocument")}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Verify on Blockchain
                      </Button>
                    )}
                  </div>
                  <div className="border rounded-md p-4">
                    {previews.budgetDocument ? (
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={
                                previews.budgetDocument || "/placeholder.svg"
                              }
                              alt="Budget document preview"
                              width={100}
                              height={100}
                              className="object-cover rounded-md"
                            />
                            <div>
                              <div className="flex items-center">
                                <span className="text-sm">
                                  {files.budgetDocument?.name}
                                </span>
                                {verifiedHashes.budgetDocument && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-green-50"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              {verifiedHashes.budgetDocument && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Hash:{" "}
                                  {verifiedHashes.budgetDocument.slice(0, 10)}
                                  ...
                                  {verifiedHashes.budgetDocument.slice(-8)}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile("budgetDocument")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, Excel, PNG, JPG (MAX. 10MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.xlsx,.xls,.png,.jpg,.jpeg"
                            onChange={(e) =>
                              handleFileChange(e, "budgetDocument")
                            }
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roadmap">Your Roadmap</Label>
                <Textarea
                  id="roadmap"
                  name="roadmap"
                  value={roadmapContent}
                  onChange={handleInputChange}
                  className="min-h-[200px]"
                  placeholder="Describe your educational and career roadmap..."
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save to Blockchain"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
