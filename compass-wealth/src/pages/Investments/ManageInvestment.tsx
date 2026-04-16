import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export type Investment = {
  id?: string;
  name: string;
  type: string;
  no_of_units: number;
  avg_buy_price: number;
  current_price: number;
  charges: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Investment) => void;
  defaultValues?: Investment | null;
  mode: "add" | "edit" | undefined;
};

const ManageInvestment = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
  mode,
}: Props) => {
  const form = useForm<Investment>({
    defaultValues: {
      name: "",
      type: "",
      avg_buy_price: 0,
      current_price: 0,
      charges: 0,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        name: "",
        type: "",
        avg_buy_price: 0,
        current_price: 0,
        charges: 0,
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = (data: Investment) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Asset" : "Update Asset"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Reliance, BTC" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Stock, Crypto..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="no_of_units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of Units</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      type="number"
                      {...field}
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Buy Price */}
            <FormField
              control={form.control}
              name="avg_buy_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Buy Price</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      type="number"
                      {...field}
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Current Price */}
            <FormField
              control={form.control}
              name="current_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Price</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      type="number"
                      {...field}
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Charges */}
            <FormField
              control={form.control}
              name="charges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charges</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      type="number"
                      {...field}
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2">
              {mode === "add" ? "Add Asset" : "Update Asset"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageInvestment;
