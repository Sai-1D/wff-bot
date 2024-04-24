export const ROLE_USER = "user";
export const ROLE_ASSISTANT = "assistant";
export const ROLE_SYSTEM = "system";

export function getMessageObject(role,content){
    return {"role":`${role}`,"content":`${content}`}
}