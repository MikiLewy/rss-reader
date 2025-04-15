interface Props {
  count: number;
}

const ResultsCount = ({ count }: Props) => {
  return <p className="text-base text-gray-700">{count} results</p>;
};

export default ResultsCount;
