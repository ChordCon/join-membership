React Hook Form
https://react-hook-form.com/

https://nomadcoders.co/react-masterclass/lectures/3358

 회원가입창 같은 폼과 인풋이 엄청많고 인풋의 조건을 다 확인하려면 미친듯이 많은 코드가 필요한데
이를 줄여준다.

useForm
const { register, watch } = useForm();

register()
이벤트를 만들고 인풋에 프롭스를 전달해준다.

console.log(watch());
watch로 form의 입력값을 추적할수있다.

아래처럼 만들려면 어마어마한 스테이트와 각각의 onChange 와 등등이 필요한데 
const { register, watch } = useForm();한줄로 끝.
function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("email")} type="text" placeholder="email" />
        <input
          {...register("firstName")}
          type="text"
          placeholder="first name"
        />
        <input {...register("lastName")} type="text" placeholder="lastName" />
        <input {...register("userName")} type="text" placeholder="userName" />
        <input {...register("password")} type="text" placeholder="password" />
        <input {...register("password1")} type="text" placeholder="password1" />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;






handleSubmit
e.preventDefault()의 역할을 해주고
조건을 검사한다.
조건에 맞지 않는 인풋이 있다면 그인풋으로 자동으로 이동시킨다... 미쳤다..ㅋ

formState
인풋 조건에 맞지 않는 에러의 정보를 표시해주고
유저에게 메시지를 보낼수 있게 해준다.


조건을 검사하고 에러의 정보를 표시하고 
유저에게 메시지보낼 메시지를 작성
function ToDoList() {
  const { register, watch, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  //   console.log(watch());
  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true })} placeholder="email" />
        <input
          {...register("firstName", { required: true })}
          placeholder="first name"
        />
        <input
          {...register("lastName", { required: true })}
          placeholder="lastName"
        />
        <input
          {...register("userName", {
            required: true,
            minLength: {
              value: 2,
              message: "User Name is too short",
            },
          })}
          placeholder="userName"
        />
        <input
          {...register("password", { required: true })}
          placeholder="password"
        />
        <input
          {...register("password1", { required: "Password is required" })}
          placeholder="password1"
        />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;

유저에게 에러를 알려주는 방법

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onValid = (data: any) => {
    console.log(data);
  };
  // console.log(watch());
  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
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
          {...register("lastName", { required: "Last name is required" })}
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
        />
        <div>{errors?.password?.message}</div>
        <input
          {...register("passwordCheck", {
            required: "Password check is required",
          })}
          placeholder="passwordCheck"
        />
        <div>{errors?.passwordCheck?.message}</div>
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;

인풋의 디폴트값을 설정해주는 방법
const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });


setError

비밀번호과 비밀번화 확인이 같은지 확인
function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IFormData) => {
    if (data.password !== data.passwordCheck) {
      setError("passwordCheck", { message: "Passpassword is not same" });
    }
  };


추가적인 에러가 발생했을때 

type IFormData = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck: string;
  extraErr?: string;
};

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IFormData) => {
    if (data.password !== data.passwordCheck) {
      setError("passwordCheck", { message: "Passpassword is not same" });
    }
    setError("extraErr", { message: "Server offline" });
  };
  console.log(watch());
  console.log(errors);

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

validate
조건을 내가 정할때.
validate가 트루면 통과 폴스면 통과 못함.
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
위 조건은 문자열에 nico가 포함되었는지.
숫자는 안돼 뭐 이런걸로 사용가능해보임.
다양한 조건을 사용해야할때 위처럼 객채로 사용가능

setValue
인풋의 벨류를 변경할때.
