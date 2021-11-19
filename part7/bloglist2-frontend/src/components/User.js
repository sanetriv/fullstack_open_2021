import { List } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>User</h2>
      <h3>added blogs</h3>
      <List dataSource={user.blogs} renderItem={item => <List.Item>{item.title}</List.Item>} />
    </div>
  )
}

export default User