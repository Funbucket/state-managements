import { atom, useRecoilValue, useSetRecoilState } from "recoil";

interface InitialStateType {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: InitialStateType = {
  isAuthenticated: false,
  token: null,
};

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any): void => {
    const savedValue: string | null = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    // 데이터 조회
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    // 데이터 수정
    onSet((newValue: string | undefined): void => {
      typeof window !== "undefined"
        ? newValue
          ? localStorage.setItem(key, JSON.stringify(newValue))
          : localStorage.removeItem(key)
        : undefined;
    });
  };

const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any): void => {
    const savedValue: string | null = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    // 데이터 조회
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    // 데이터 수정
    onSet((newValue: string | undefined): void => {
      typeof window !== "undefined"
        ? newValue
          ? sessionStorage.setItem(key, JSON.stringify(newValue))
          : sessionStorage.removeItem(key)
        : undefined;
    });
  };

const authAtom = atom<InitialStateType>({
  key: "authAtom",
  default: initialState,
  effects: [localStorageEffect("recoil_auth")],
});

export const useAuthValue = () => useRecoilValue(authAtom);
export const useAuthSetter = () => useSetRecoilState(authAtom);
