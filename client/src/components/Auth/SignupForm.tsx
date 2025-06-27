import { Button, Form, Input } from 'antd'
import { useAppDispatch } from '../../hooks/store'
import { appSlice } from '../../store/app.reducer'
import { usePostUserMutation } from '../../store/users.api'
import { IUserPostBody } from '@lib/utils/interfaces/user'
import { errorNotification } from '../../utils/notifications'
import { validationRules } from '../../utils/validation'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const [postUser] = usePostUserMutation()

    function onFinish(user: IUserPostBody) {
        postUser(user).then((value: any) => {
            if (value.data) {
                const token = value.data.result
                dispatch(appSlice.actions.setToken(token))

                navigate('/forbidden')
            } else {
                // TODO: Handle validation errors
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(
                    value.error?.originalStatus === 503 ? 'Реєстрація недоступна' : error,
                    'Не вдалося зареєструватися'
                )
            }
        })
    }

    return (
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off" className="auth-form">
            <Form.Item name="name" rules={[validationRules.REQUIRED('Please write your name'), validationRules.NAME()]}>
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[validationRules.EMAIL('Invalid email'), validationRules.REQUIRED('Please write your email')]}
            >
                <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    validationRules.REQUIRED('Please write your password'),
                    validationRules.PASSWORD(
                        'Пароль має містити 6-20 символів, хочаб одну цифру, велику та маленьку літери латинського алфавіту та спеціальний символ: -#$.%&@(){}[]!?+*'
                    )
                ]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <div className="button">
                <Button className="button" htmlType="submit" type="primary">
                    Sign up
                </Button>
            </div>
        </Form>
    )
}
