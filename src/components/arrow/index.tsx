import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom"


type ArrowProps = {
  to: string;
}

export default function Arrow ({to}: ArrowProps){
  return (

    <Link to={to} className="text-gray-500 hover:text-gray-700">
      <ChevronLeft />
    </Link>
  )
}
