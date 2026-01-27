import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";

export default function Rating({rating}:{rating:number}) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 rounded-md bg-yellow-700">
      <Icon
        path={mdiStar}
        size={"20px"}
        className="text-yellow-400 fill-yellow-400"
      />
      <span className={`text-xl text-yellow-400`}>
        {rating}
      </span>
    </div>
  );
}
