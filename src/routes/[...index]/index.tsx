import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { fetchOneEntry, Content } from "@builder.io/sdk-qwik";

export const BUILDER_MODEL = "page";

// Define a route loader function that loads
// content from Builder based on the URL.
export const useBuilderContent = routeLoader$(async ({ env }) => {
    const BUILDER_PUBLIC_API_KEY = env.get("PUBLIC_BUILDER_API_KEY") ?? '';

    // Fetch content for the specified model using the API key.
    const builderContent = await fetchOneEntry({
        model: BUILDER_MODEL,
        apiKey: BUILDER_PUBLIC_API_KEY,
    });

    // Return the fetched content.
    return {
        BUILDER_PUBLIC_API_KEY,
        builderContent
    };
});

export default component$(() => {
    const { BUILDER_PUBLIC_API_KEY, builderContent } = useBuilderContent().value;

    return (
        <Content
            model={BUILDER_MODEL}
            content={builderContent}
            apiKey={BUILDER_PUBLIC_API_KEY}
        />
    );
});
