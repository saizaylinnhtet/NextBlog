"use client"

import React from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createBlogSchema } from '@/lib/schema'
import { CreateBlogFormData } from '@/lib/type'
import { X, Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
const Create = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            title: "",
            content: "",
            images: [],
        },
    })

    const onSubmit: SubmitHandler<CreateBlogFormData> = (data) => {
        console.log(data)
    }

    return (
        <div className="flex justify-center mt-15">
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>Creating a new Blog</CardTitle>
                    <CardDescription>
                        Provide a title and content for your blog.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Title
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="AI is the future"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="content"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Description
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                {...field}
                                                id="form-rhf-demo-description"
                                                placeholder="AI is leading the future with it's rapid growth."
                                                rows={6}
                                                className="min-h-24 resize-none"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <InputGroupAddon align="block-end">
                                                <InputGroupText className="tabular-nums">
                                                    {field.value.length}/500 characters
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <FieldDescription>
                                            Share your thoughts and knowledge.
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="images"
                                control={control}
                                render={({ field: { onChange, value = [] }, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Images</FieldLabel>

                                        {/* hidden input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="image-upload"
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || [])
                                                if (files.length) onChange([...value, ...files])  // spread all selected files
                                                e.target.value = '' // reset to add same image
                                            }}
                                        />

                                        {/* previews + add button */}
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            {value.map((file: File, index: number) => (
                                                <div key={index} className="relative h-24 w-24">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`preview-${index}`}
                                                        className="h-full w-full object-cover rounded-md"
                                                    />
                                                    {/* delete button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => onChange(value.filter((_: File, i: number) => i !== index))}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}

                                            {/* add button */}
                                            <label
                                                htmlFor="image-upload"
                                                className="h-24 w-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-muted"
                                            >
                                                <Plus size={24} />
                                            </label>
                                        </div>

                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="form-rhf-demo">
                            Create
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>

    )
}

export default Create