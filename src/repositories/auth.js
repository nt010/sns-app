import { supabase } from "../lib/supabase";

export const authRepository = {
  async signup(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error != null) throw new Error(error.message);
    return { ...data.user, userName: data.user.user_metadata.name };
  },
  async signin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error != null) throw new Error(error.message);
    return { ...data.user, userName: data.user.user_metadata.name };
  },
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getSession(); // sessionは1hで切れる
    if (error != null) throw new Error(error.message);
    if (data.session == null) return;

    return {
      ...data.session.user,
      userName: data.session.user.user_metadata.name, // self.userで取得できるようにする
    };
  },
};
