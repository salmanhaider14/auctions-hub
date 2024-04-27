"use client";
import { createAuction } from "@/actions/actions";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface AuctionForm {
  title: string;
  description: string;
  startingPrice: number;
  reservePrice: number;
  endDate: string;
  images: any;
}
const AuctionFormSchema = z.object({
  title: z.string().min(1, "Title must not be empty"),
  description: z.string().min(1, "Description must not be empty"),
  startingPrice: z
    .number()
    .min(0, "Starting price must be a non-negative number"),
  reservePrice: z
    .number()
    .min(0, "Reserve price must be a non-negative number"),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/i, "Invalid date format"),
});

const CreateAuction = () => {
  const [form, setForm] = useState<AuctionForm>({
    title: "",
    description: "",
    startingPrice: 0,
    reservePrice: 0,
    endDate: "",
    images: [], // Array to store image file objects
  });

  const { userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(form);
    setFormErrors({});
    try {
      setIsSubmitting(true); // Set isSubmitting to true when form is being submitted
      const validatedForm = AuctionFormSchema.parse(form);
      if (userId != null) {
        const images = form.images;
        console.log(images);
        let imageUrls: string[] = [];
        for (const image in images) {
          if (images.hasOwnProperty(image)) {
            const value = images[image];
            const uploadedFiles = await fetch(
              `${process.env.NEXT_PUBLIC_URL}/api/uploadImage?filename=${value.name}`,
              {
                method: "POST",
                body: value,
              }
            );
            const uploadedFilesRes = await uploadedFiles.json();
            imageUrls.push(uploadedFilesRes.url);
          }
        }

        await createAuction({
          ...form,
          userId,
          images: imageUrls,
        });
        toast({
          title: "Auction Created Successfully",
          description: `${form.title}`,
          variant: "default",
        });
        setForm({
          title: "",
          description: "",
          startingPrice: 0,
          reservePrice: 0,
          endDate: "",
          images: [],
        });
        router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard`);
      }
    } catch (error) {
      toast({
        title: "Ops something went wrong",
        description: `Plz recheck the form below`,
        variant: "destructive",
      });
      if (error instanceof z.ZodError) {
        let zodErrors: any = {};

        for (const err of error.errors) {
          // Extract the field name from the error path
          const fieldName = err.path[0];
          // Set the error message for the field
          zodErrors[fieldName] = err.message;
        }
        setFormErrors(zodErrors);
        console.log(formErrors);
      } else {
        console.error("Error creating auction:", error);
      }
    } finally {
      setIsSubmitting(false); // Reset isSubmitting after submission completes
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Create Auction</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title" className="text-gray-700">
            Title:
          </Label>
          <Input
            type="text"
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            required
            id="title"
          />
          {formErrors.title && (
            <p className="text-sm text-red-500">{formErrors.title}</p> // Render error message if there is an error
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-gray-700">
            Description:
          </Label>
          <Textarea
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            required
            id="description"
          />
          {formErrors.description && (
            <p className="text-sm text-red-500">{formErrors.description}</p> // Render error message if there is an error
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="startingPrice" className="text-gray-700">
            Starting Price:
          </Label>
          <Input
            type="number"
            value={form.startingPrice}
            onChange={(event) =>
              setForm({ ...form, startingPrice: event.target.valueAsNumber })
            }
            required
            id="startingPrice"
          />
          {formErrors.startingPrice && (
            <p className="text-sm text-red-500">{formErrors.startingPrice}</p> // Render error message if there is an error
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reservePrice" className="text-gray-700">
            Reserve Price:
          </Label>
          <Input
            type="number"
            value={form.reservePrice}
            onChange={(event) =>
              setForm({ ...form, reservePrice: event.target.valueAsNumber })
            }
            required
            id="reservePrice"
          />
          {formErrors.reservePrice && (
            <p className="text-sm text-red-500">{formErrors.reservePrice}</p> // Render error message if there is an error
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="endDate" className="text-gray-700">
            End Date:
          </Label>
          <Input
            type="datetime-local"
            value={form.endDate}
            onChange={(event) =>
              setForm({ ...form, endDate: event.target.value })
            }
            required
            id="endDate"
          />
          {formErrors.endDate && (
            <p className="text-sm text-red-500">{formErrors.endDate}</p> // Render error message if there is an error
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="images" className="text-gray-700">
            Images:
          </Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => {
              const selectedFiles = event.target.files;
              setForm({ ...form, images: selectedFiles });
            }}
            required
            id="images"
          />
          {formErrors.images && (
            <p className="text-sm text-red-500">{formErrors.images}</p> // Render error message if there is an error
          )}
        </div>

        <Button
          disabled={isSubmitting}
          className={`${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-700"
          } text-white font-bold py-2 px-4 rounded`}
          type="submit"
        >
          {isSubmitting ? "Creating Auction..." : "Create Auction"}
        </Button>
      </form>
    </div>
  );
};

export default CreateAuction;
