import { useEffect, useState } from "react";

import type { CodeName } from "@regions-of-indonesia/client";

import client from "./client";

function useProvinces() {
  const [data, setData] = useState<CodeName[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const controller = new AbortController();
    setData([]);
    setLoading(true);
    setError(undefined);

    async function fetch() {
      try {
        setData(await client.province.find({ signal: controller.signal }));
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
  }, []);

  return { data, loading, error };
}

function useDistricts(provinceCode: string) {
  const [data, setData] = useState<CodeName[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const controller = new AbortController();
    setData([]);
    setLoading(true);
    setError(undefined);

    async function fetch() {
      try {
        setData(await client.district.findByProvinceCode(provinceCode, { signal: controller.signal }));
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
  }, [provinceCode]);

  return { data, loading, error };
}

function useSubdistricts(districtCode: string) {
  const [data, setData] = useState<CodeName[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const controller = new AbortController();
    setData([]);
    setLoading(true);
    setError(undefined);

    async function fetch() {
      try {
        setData(await client.subdistrict.findByDistrictCode(districtCode, { signal: controller.signal }));
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
  }, [districtCode]);

  return { data, loading, error };
}

function useVillages(subdistrictCode: string) {
  const [data, setData] = useState<CodeName[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const controller = new AbortController();
    setData([]);
    setLoading(true);
    setError(undefined);

    async function fetch() {
      try {
        setData(await client.village.findBySubdistrictCode(subdistrictCode, { signal: controller.signal }));
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
  }, [subdistrictCode]);

  return { data, loading, error };
}

export { useProvinces, useDistricts, useSubdistricts, useVillages };
