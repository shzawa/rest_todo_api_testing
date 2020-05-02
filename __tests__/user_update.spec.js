/**
 * sign_in
 * update
 */

const frisby = require('frisby')
// const Joi = frisby.Joi

const tgt_host = 'http://localhost'
const tgt_port = ':8000'

const normal = {
  name: 'test1',
  email: 'test1@gmail.com',
  password: 'hogehoge'
}

const newNormal = {
  name: 'test',
  email: 'test@.com'
}

let uid = ''

let update_origin = ''

const login_src = '/api/v1/auth/sign_in'
const login_origin = `${tgt_host}${tgt_port}${login_src}`

describe('ユーザーログインに関するテスト', () => {
  describe('emailだけ異常値', () => {
    const form = {
      email: null,
      password: normal.password,
    }

    it('空文字', () => {
      let localForm = form
      localForm.email = ''

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.email = '　'

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('256文字以上', () => {
      let localForm = form
      localForm.email = 'uWYtcAsICrs4TO6QcM6bFjCVxII4fbOwL5IwF6GlQjLtnNiaKFe62MmkPLTJJ7RNLKXEX5refUhY2SN1oIRhvhagK7WHAcrYvyhMnhxrNj6JglL1KytJSSN2FkBEfjVYUKB0nCrPw34vtQkENtADkfgpSutEdksuHS15bD6bQGc3PnQoGGEbq42ieEtB4NKC0AluyvGxeKrFmm8RVPw77U1SUMP4XRHby7fBvj2B4AiLtFmTfq7SJsWeqNARuV3D'

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('半角英数以外の文字を含む', () => {
      let localForm = form
      localForm.email = 'ああああ@gmail.com'

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('異常なフォーマット', () => {
      let localForm = form
      localForm.email = '.test1.@gmail.com'

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })
  })

  describe('passwordだけ異常値', () => {
    const form = {
      email: normal.email,
      password: null
    }

    it('空文字', () => {
      let localForm = form
      localForm.password = ''

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.password = '　'

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('半角英数以外の文字を含む', () => {
      let localForm = form
      localForm.password = 'あああああああaa'

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('256文字以上', () => {
      let localForm = form
      localForm.password = 'uWYtcAsICrs4TO6QcM6bFjCVxII4fbOwL5IwF6GlQjLtnNiaKFe62MmkPLTJJ7RNLKXEX5refUhY2SN1oIRhvhagK7WHAcrYvyhMnhxrNj6JglL1KytJSSN2FkBEfjVYUKB0nCrPw34vtQkENtADkfgpSutEdksuHS15bD6bQGc3PnQoGGEbq42ieEtB4NKC0AluyvGxeKrFmm8RVPw77U1SUMP4XRHby7fBvj2B4AiLtFmTfq7SJsWeqNARuV3D'

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })
  })

  describe('パラメータ正常なのにサインイン失敗', () => {
    it('アカウント未登録', () => {
      const localForm = {
        email: 'test99@gmail.com',
        password: normal.password
      }

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 404)
    })

    it('パスワードが違う', () => {
      const localForm = {
        email: normal.email,
        password: 'hogehoge1'
      }

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .expect('status', 404)
    })
  })

  // uid持ち回り開始
  describe('サインイン成功', () => {
    it('', () => {
      const localForm = {
        email: normal.email,
        password: normal.password
      }

      return frisby.post(`${login_origin}`, {
          body: localForm
        })
        .then(res => {
          const body = JSON.parse(res.body)
          const user_id = body.result.id
          uid = res.headers.get('uid')

          const tgt_rsc = `/api/v1/users/${user_id}`
          update_origin = `${tgt_host}${tgt_port}${tgt_rsc}`

          expect(res.status).toBe(200)
        })
    })
  })
})

describe('ユーザー情報編集に関するテスト', () => {
  describe('uidについて', () => {
    it('headersにuidが無い', () => {
      return frisby.put(`${update_origin}`, {
          body: newNormal,
        })
        .expect('status', 401)
    })
  })

  describe('{id}について', () => {
    it('存在しないuser_id', () => {
      const tgt_rsc = `/api/v1/users/10`
      const tgt_origin = `${tgt_host}${tgt_port}${tgt_rsc}`

      return frisby.put(`${tgt_origin}`, {
          body: newNormal,
          headers: {
            uid: uid
          }
        })
        .expect('status', 404)
    })
  })

  describe('ログインユーザー以外のデータ', () => {
    it('uidが不一致', () => {
      return frisby.put(`${update_origin}`, {
          body: newNormal,
          headers: {
            uid: 'F3XSpC5Wf8xy4Se'
          }
        })
        .expect('status', 403)
    })
  })

  describe('nameだけ異常値', () => {
    const form = {
      name: null,
      email: newNormal.email,
    }

    it('空文字', () => {
      let localForm = form
      localForm.name = ''

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.name = '　'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('半角英数以外を含む', () => {
      let localForm = form
      localForm.name = 'てすと'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('65文字以上', () => {
      let localForm = form
      localForm.name = 'SLSbD4PKyh4UrCfcsSJy7sSvKqc4N6b4AITnXWVxj6DeC4URsqW0RuQoyFruKNbnb'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('他ユーザーと重複', () => {
      let localForm = form
      localForm.name = 'test0'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })
  })

  describe('emailだけ異常値', () => {
    const form = {
      name: newNormal.name,
      email: null,
    }

    it('空文字', () => {
      let localForm = form
      localForm.email = ''

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.email = '　'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('256文字以上', () => {
      let localForm = form
      localForm.email = 'uWYtcAsICrs4TO6QcM6bFjCVxII4fbOwL5IwF6GlQjLtnNiaKFe62MmkPLTJJ7RNLKXEX5refUhY2SN1oIRhvhagK7WHAcrYvyhMnhxrNj6JglL1KytJSSN2FkBEfjVYUKB0nCrPw34vtQkENtADkfgpSutEdksuHS15bD6bQGc3PnQoGGEbq42ieEtB4NKC0AluyvGxeKrFmm8RVPw77U1SUMP4XRHby7fBvj2B4AiLtFmTfq7SJsWeqNARuV3D'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('半角英数以外を含む', () => {
      let localForm = form
      localForm.email = 'ああああ@gmail.com'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('異常なフォーマット', () => {
      let localForm = form
      localForm.email = '.test1.@gmail.com'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })

    it('他ユーザーと重複', () => {
      let localForm = form
      localForm.email = 'test0@gmail.com'

      return frisby.put(`${update_origin}`, {
          body: localForm,
          headers: {
            uid: uid
          }
        })
        .expect('status', 400)
    })
  })

  describe('更新成功', () => {
    it('', () => {
      return frisby.put(`${update_origin}`, {
          body: newNormal,
          headers: {
            uid: uid
          }
        })
        .expect('status', 200)
    })
  })
})
