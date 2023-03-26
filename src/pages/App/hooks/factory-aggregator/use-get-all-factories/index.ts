import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import factoryAggregatorAbi from '../abi/factoryAggregatorABI.json';
import config from '../../../../../exconfig.json';
import { FactoryDetails } from './use-get-all-factories.types';

const normalizeData = (getAllFactoriesOutput: any[]): FactoryDetails[] => {
  const normalized = [];
  for (let item of getAllFactoriesOutput) {
    const normalizedFactory: FactoryDetails = {
      factoryAddress: item[0],
      factoryName: item[1],
      factoryDescription: item[2],
      audited: item[3],
    };

    normalized.push(normalizedFactory);
  }

  return normalized;
};

const useGetAllFactories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<FactoryDetails[]>([]);
  const [factoryAggregatorContract, setFactoryAggregatorContract] =
    useState<ethers.Contract>(
      (() => {
        const provider = new ethers.providers.JsonRpcProvider();
        return new ethers.Contract(
          config.aggregator_address,
          factoryAggregatorAbi,
          provider
        );
      })()
    );

  const execute = async (): Promise<FactoryDetails[]> => {
    setLoading(true);

    try {
      const factories = await factoryAggregatorContract.getAllFactories();
      setLoading(false);
      setData(normalizeData(factories));
      console.log('FACTORIES', normalizeData(factories));
      return factories as FactoryDetails[];
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
      setData([]);
      return [];
    }
  };

  useEffect(() => {
    execute();
  }, [factoryAggregatorContract]);

  return { data, loading, error, execute };
};

export default useGetAllFactories;
