import React from "react";
import { FieldValues, UseControllerProps, ControllerRenderProps } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";

export type FormInputProps<T extends FieldValues> = InputProps &
  UseControllerProps<T> & {
    label: string;
  };

export function FormInput<S extends FieldValues>({ name, control, label, ...inputProps }: FormInputProps<S>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<S> }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...inputProps} onChange={field.onChange} value={field.value} onBlur={field.onBlur} disabled={field.disabled} name={field.name} ref={field.ref} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
