type card = {
  heading: string;
  content: number;
};
export const Card = ({ heading, content }: card) => {
  return (
    <div className="h-[150px] bg-primary w-[300px] px-5 py-8 rounded-2xl my-6">
      <div className="text-white font-bold text-2xl mb-5">{heading}</div>
      <div className="text-white font-semibold text-xl">{content}</div>
    </div>
  );
};
