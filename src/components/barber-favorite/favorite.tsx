// import { Star, UserCircle2 } from "lucide-react";
// import Spinner from "../Spinner";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import useFavorite from "./useFavorite";
// import { Link } from "react-router-dom";
// import React from "react";

// const Favorite: React.FC = () => {
//   const {
//     favoriteList,
//     isFetching,
//   } = useFavorite();

//   return (
//     <div className="space-y-4">
//       {isFetching && (
//         <div className="w-full text-center">
//           <Spinner size="lg" />
//         </div>
//       )}
//       {!isFetching &&
//         favoriteList &&
//         favoriteList.map((favorite) => (
//           <div
//             key={favorite.id}
//             className="bg-paper rounded-lg p-4 flex gap-4 items-center text-gray-800"
//           >
//             <Avatar className="size-16">
//               <AvatarImage src={favorite.photoUrl} />
//               <AvatarFallback>
//                 <UserCircle2 className="size-12" />
//               </AvatarFallback>
//             </Avatar>

//             <div className="flex-grow">
//               <h2 className="font-semibold">{favorite.name}</h2>
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={`${favorite.id}${i}`}
//                     className={`w-4 h-4 ${
//                       i < Math.floor(favorite.rating)
//                         ? "text-yellow-400 fill-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//                 <span className="ml-1 text-sm text-gray-600">
//                   {favorite.rating}
//                 </span>
//               </div>
//             </div>
//             <Link
//               to={`/details-barber-shop/${favorite.id}`}
//               className="border border-slate-400 px-4 rounded-md bg-white hover:bg-primary text-black hover:text-white"
//             >
//               Ver Perfil
//             </Link>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Favorite;
