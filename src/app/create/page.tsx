'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCreatePost } from "@/lib/queriesAndMutations/mutations";


const formSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
})

const Create = () => {
    const { toast } = useToast();
    const { isLoaded, user } = useUser();
    const handleCreate = useCreatePost();
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState<string>("");
    const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string>("");

    const handleUploadSuccess = (results: any) => {
        const { secure_url, public_id } = results.info;
        setCloudinaryImageUrl(secure_url);
        setCloudinaryPublicId(public_id);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoaded && !!cloudinaryImageUrl && !!cloudinaryPublicId) {
            const newPost = {
                userId: user?.id,
                ...values,
                username: user?.username,
                avatarUrl: user?.imageUrl,
                assetUrl: cloudinaryImageUrl,
                assetPublicId: cloudinaryPublicId
            }
            handleCreate.mutate(newPost);
            if (handleCreate.isError) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request. Reload and try again"
                })
                return
            }
            toast({
                title: "Your post is successfully created",
            })
        }
        return
    }
    return (
        <div>
            <CldUploadWidget uploadPreset="media_preset"
                onSuccess={handleUploadSuccess}>
                {({ open }) => {
                    return (
                        <Button onClick={() => open()}>
                            upload
                        </Button>
                    );
                }}
            </CldUploadWidget>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="title" {...field} className="text-black"/>
                                </FormControl>
                                <FormDescription>
                                    choose a good title for your post
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="description" {...field} className="text-black"/>
                                </FormControl>
                                <FormDescription>
                                    describe your post to let others know more about it.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default Create;