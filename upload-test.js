import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    'https://qbnbdwengmxqkvuwmscj.supabase.co',
    'sb_secret_jhMZ7XWBWWMkN9ogg5xz0w_5ooYFUq4'
);

async function run() {
  // simulate a file: Buffer from a small image or text
  const buffer = Buffer.from("Hello world");
  const { data, error } = await supabaseAdmin.storage
    .from("blog-images")
    .upload("test/hello.txt", buffer, { contentType: "text/plain" });

  console.log("data:", data, "error:", error);
}

run();
