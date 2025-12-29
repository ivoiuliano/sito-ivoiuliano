import { JsonLdObject } from "@/lib/jsonld";

interface JsonLdProps {
    data: JsonLdObject | JsonLdObject[];
}

export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

