import { ALL } from "dns";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setTodo] = useState("");
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setTodo(value);
//   };
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//
//           placeholder="Write a to do"
//         />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

type IFormData = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck: string;
  extraErr?: string;
  shouldFocus?: boolean;
};

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data: IFormData) => {
    if (data.password !== data.passwordCheck) {
      setError("passwordCheck", { message: "Passpassword is not same" });
    }
    reset();
    // setError("extraErr", { message: "Server offline" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <div>{errors?.extraErr?.message}</div>
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-z0-9._%+-]+@naver.com$/,
              message: "Only use @naver.com",
            },
          })}
          placeholder="email"
        />
        <div>{errors?.email?.message}</div>
        <input
          {...register("firstName", { required: "First name is required" })}
          placeholder="first name"
        />
        <div>{errors?.firstName?.message}</div>
        <input
          {...register("lastName", {
            required: "Last name is required",
            validate: {
              noNico: (value) => (value.includes("nico") ? "no goback" : true),
              noPark: (value) => (value.includes("Park") ? "no goback" : true),
            },
          })}
          placeholder="lastName"
        />
        <div>{errors?.lastName?.message}</div>
        <input
          {...register("userName", {
            required: "User name is required",
            minLength: {
              value: 2,
              message: "User Name is too short",
            },
          })}
          placeholder="userName"
        />
        <div>{errors?.userName?.message}</div>
        <input
          {...register("password", { required: "Password is required" })}
          placeholder="password"
          type={"password"}
        />
        <div>{errors?.password?.message}</div>
        <input
          {...register("passwordCheck", {
            required: "Password check is required",
          })}
          placeholder="passwordCheck"
          type={"password"}
        />
        <div>{errors?.passwordCheck?.message}</div>
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;
