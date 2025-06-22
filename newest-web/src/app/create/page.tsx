// "use client";
// import { PostFormFields } from "./PostFormFields";
// import PostSubmitButton from "./PostSubmitButton";
// import styles from "../../styles/Post.module.css";
// import { PostTypeSelector } from "./PostTypeSelector";
// import { FormDataSet, PostType } from "../../../types";
// import React, { useState, useCallback, useEffect } from "react";
// import BottomTabBar from "../component/common/BottomTabBar";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Header from "../home/Header";

const PostScreen: React.FC = () => {
  return <div />;
  //   const router = useRouter();
  //   const { data: session, status } = useSession();
  //   const [isLogin, setIsLogin] = useState<boolean>(false);
  //   const [postType, setPostType] = useState<PostType>("news");
  //   const [formData, setFormData] = useState<FormDataSet>({
  //     type: postType,
  //     title: "",
  //     images: [],
  //     description: "",
  //   });

  //   const handleFormChange = useCallback(
  //     (key: keyof FormDataSet, value: string | string[]) => {
  //       setFormData((prev) => ({ ...prev, [key]: value }));
  //     },
  //     []
  //   );

  //   useEffect(() => {
  //     setFormData({
  //       type: postType,
  //       title: "",
  //       images: [],
  //       description: "",
  //     });
  //   }, [postType]);

  //   useEffect(() => {
  //     const checkSession = async () => {
  //       if (!session && status != "loading") {
  //         router.push("/login");
  //       }
  //       setIsLogin(!!session);
  //     };

  //     checkSession();
  //   }, [router, session, status]);

  //   if (!isLogin) {
  //     return <div>Loading...</div>;
  //   }

  //   return (
  //     <div>
  //       <Header leftArrow={false} />
  //       <div className={styles.container}>
  //         <div className={styles.flex}>
  //           <div className={styles.flex}>
  //             <div className={styles.scrollView}>
  //               <PostTypeSelector
  //                 postType={postType}
  //                 onTypeChange={setPostType}
  //               />
  //               <PostFormFields
  //                 formData={formData}
  //                 postType={postType}
  //                 onFormChange={handleFormChange}
  //               />
  //               <PostSubmitButton form={formData} />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <BottomTabBar />
  //     </div>
  //   );
};

export default PostScreen;
