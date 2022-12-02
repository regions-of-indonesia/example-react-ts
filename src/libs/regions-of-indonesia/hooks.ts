import { useCallback, useEffect, useState } from "react";

import client from "./client";

function useQuery<T>(fetcher: (signal: AbortSignal) => Promise<T>) {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(undefined);

    async function fetch() {
      try {
        setData(await fetcher(controller.signal));
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Error"));
      } finally {
        setLoading(false);
      }
    }

    fetch();

    return () => {
      controller.abort(new Error("Canceled"));
    };
  }, [fetcher]);

  return { data, loading, error };
}

function useProvinces() {
  return useQuery(
    useCallback(async (signal: AbortSignal) => {
      return await client.province.find({ signal });
    }, [])
  );
}

function useDistricts(provinceCode?: string) {
  return useQuery(
    useCallback(
      async (signal: AbortSignal) => {
        if (typeof provinceCode !== "string" || provinceCode === "") throw new Error("Invalid params");
        return await client.district.findByProvinceCode(provinceCode, { signal });
      },
      [provinceCode]
    )
  );
}

function useSubdistricts(districtCode?: string) {
  return useQuery(
    useCallback(
      async (signal: AbortSignal) => {
        if (typeof districtCode !== "string" || districtCode === "") throw new Error("Invalid params");
        return await client.subdistrict.findByDistrictCode(districtCode, { signal });
      },
      [districtCode]
    )
  );
}

function useVillages(subdistrictCode?: string) {
  return useQuery(
    useCallback(
      async (signal: AbortSignal) => {
        if (typeof subdistrictCode !== "string" || subdistrictCode === "") throw new Error("Invalid params");
        return await client.village.findBySubdistrictCode(subdistrictCode, { signal });
      },
      [subdistrictCode]
    )
  );
}

export { useProvinces, useDistricts, useSubdistricts, useVillages };
