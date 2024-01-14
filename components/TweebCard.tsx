import { useEffect, useState } from "react";
import { Tweeb, User } from "./types";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
export default function TweebCard({
  tweeb,
  remove,
}: {
  tweeb: Tweeb;
  remove: (id: string) => void;
}) {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    supabase
      .from("profiles")
      .select()
      .eq("id", tweeb.user_id)
      .then((data) => (data.data ? setUser(data.data[0]) : setUser(undefined)));
  }, []);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("tweeebs")
      .delete()
      .eq("id", tweeb.id)
      .select();

    remove(tweeb.id);
  };
  return (
    <div className="w-auto flex flex-col justify-between border-t border-b border-slate-800 items-start py-2 px-6">
      <div className="flex gap-2 items-stretch p-1">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={tweeb.author_avatar}
          alt="author's avatar picture"
        />
        <p className="text-md  text-slate-400 ">{user?.full_name}</p>
        <p className="text-xs text-slate-700 mt-1">
          {new Date(tweeb.created_at).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-col gap-2 ml-12 w-[80%] px-4 pb-3 rounded-md">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl  text-slate-200">{tweeb.title}</h1>
          <h3 className="text-sm italic  text-slate-500">{tweeb.topic}</h3>
        </div>
        <p className="text-md  text-slate-300">{tweeb.content}</p>
        {tweeb.uploads && (
          <div className="flex gap-2">
            {tweeb.uploads.map((file, index) => (
              <img
                key={index}
                src={file}
                alt="image posted"
                className="w-80 h-60"
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full px-10 flex justify-between">
        <button>{tweeb.likes?.length}</button>
        {user?.full_name === session?.user.user_metadata.name && (
          <button
            className="px-1 rounded-full justify-self-end hover:bg-slate-800"
            onClick={handleDelete}
          >
            x
          </button>
        )}
      </div>
    </div>
  );
}
