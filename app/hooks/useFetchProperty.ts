import { useState, useEffect } from 'react';


export function useFetchProperty(propertyId: number, supabase: any) {
    const [properties, setProperties] = useState<null | any[]>(null);
    const [fetchError, setFetchError] = useState<string | null>(
      "error fetching properties"
    );
    
    useEffect(() => {
        const fetchProperty = async () => {
            try {
              const { data, error } = await supabase
                .from("properties")
                .select("*")
                .eq("id", propertyId)
                .single();
      
              if (error) {
                setFetchError("error fetching properties");
                setProperties([]);
                console.error(error);
              }
              if (data) {
                setProperties([data]);
                setFetchError(null);
              }
            } catch (error) {
              console.error("An unexpected error occurred:", error);
            }
          };
          fetchProperty();
    }, [propertyId, supabase]);
    
    return {properties, fetchError};
}