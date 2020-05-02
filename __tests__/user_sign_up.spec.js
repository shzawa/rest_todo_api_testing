/**
 * sign_up
 * sign_in
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

describe('ユーザー登録に関するテスト', () => {
  const tgt_rsc = '/api/v1/auth/sign_up'
  const tgt_origin = `${tgt_host}${tgt_port}${tgt_rsc}`

  describe('nameだけ異常値', () => {
    const form = {
      name: null,
      email: normal.email,
      password: normal.password,
    }

    it('空文字', () => {
      let localForm = form
      localForm.name = ''

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.name = '　'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('半角英数以外を含む', () => {
      let localForm = form
      localForm.name = 'てすと'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('65文字以上', () => {
      let localForm = form
      localForm.name = 'SLSbD4PKyh4UrCfcsSJy7sSvKqc4N6b4AITnXWVxj6DeC4URsqW0RuQoyFruKNbnb'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('他ユーザーと重複', () => {
      let localForm = form
      localForm.name = 'test0'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })
  })

  describe('emailだけ異常値', () => {
    const form = {
      name: normal.name,
      email: null,
      password: normal.password,
    }

    it('空文字', () => {
      let localForm = form
      localForm.email = ''

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.email = '　'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('256文字以上', () => {
      let localForm = form
      localForm.email = 'uWYtcAsICrs4TO6QcM6bFjCVxII4fbOwL5IwF6GlQjLtnNiaKFe62MmkPLTJJ7RNLKXEX5refUhY2SN1oIRhvhagK7WHAcrYvyhMnhxrNj6JglL1KytJSSN2FkBEfjVYUKB0nCrPw34vtQkENtADkfgpSutEdksuHS15bD6bQGc3PnQoGGEbq42ieEtB4NKC0AluyvGxeKrFmm8RVPw77U1SUMP4XRHby7fBvj2B4AiLtFmTfq7SJsWeqNARuV3D'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('半角英数以外を含む', () => {
      let localForm = form
      localForm.email = 'ああああ@gmail.com'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('異常なフォーマット', () => {
      let localForm = form
      localForm.email = '.test1.@gmail.com'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('他ユーザーと重複', () => {
      let localForm = form
      localForm.email = 'test0@gmail.com'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })
  })

  describe('passwordだけ異常値', () => {
    const form = {
      name: normal.name,
      email: normal.email,
      password: null
    }

    it('空文字', () => {
      let localForm = form
      localForm.password = ''

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.password = '　'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('半角英数以外を含む', () => {
      let localForm = form
      localForm.password = 'あああああああaa'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('256文字以上', () => {
      let localForm = form
      localForm.password = 'uWYtcAsICrs4TO6QcM6bFjCVxII4fbOwL5IwF6GlQjLtnNiaKFe62MmkPLTJJ7RNLKXEX5refUhY2SN1oIRhvhagK7WHAcrYvyhMnhxrNj6JglL1KytJSSN2FkBEfjVYUKB0nCrPw34vtQkENtADkfgpSutEdksuHS15bD6bQGc3PnQoGGEbq42ieEtB4NKC0AluyvGxeKrFmm8RVPw77U1SUMP4XRHby7fBvj2B4AiLtFmTfq7SJsWeqNARuV3D'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })
  })

  describe('サインアップ成功', () => {
    it('', () => {
      return frisby.post(`${tgt_origin}`, {
          body: normal
        })
        .expect('status', 201)
    })
  })
})

describe('ユーザーログインに関するテスト', () => {
  const tgt_rsc = '/api/v1/auth/sign_in'
  const tgt_origin = `${tgt_host}${tgt_port}${tgt_rsc}`

  describe('emailだけ異常値', () => {
    const form = {
      email: null,
      password: normal.password,
    }

    it('空文字', () => {
      let localForm = form
      localForm.email = ''

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.email = '　'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('256文字以上', () => {
      let localForm = form
      localForm.email = 'uWYtcAsICrs4TO6QcM6bFjCVxII4fbOwL5IwF6GlQjLtnNiaKFe62MmkPLTJJ7RNLKXEX5refUhY2SN1oIRhvhagK7WHAcrYvyhMnhxrNj6JglL1KytJSSN2FkBEfjVYUKB0nCrPw34vtQkENtADkfgpSutEdksuHS15bD6bQGc3PnQoGGEbq42ieEtB4NKC0AluyvGxeKrFmm8RVPw77U1SUMP4XRHby7fBvj2B4AiLtFmTfq7SJsWeqNARuV3D'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('半角英数以外の文字を含む', () => {
      let localForm = form
      localForm.email = 'ああああ@gmail.com'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('異常なフォーマット', () => {
      let localForm = form
      localForm.email = '.test1.@gmail.com'

      return frisby.post(`${tgt_origin}`, {
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

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('スペースのみ', () => {
      let localForm = form
      localForm.password = '　'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('半角英数以外の文字を含む', () => {
      let localForm = form
      localForm.password = 'あああああああaa'

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 400)
    })

    it('256文字以上', () => {
      let localForm = form
      localForm.password = 'uWYtcAsICrs4TO6QcM6bFjCVxII4fbOwL5IwF6GlQjLtnNiaKFe62MmkPLTJJ7RNLKXEX5refUhY2SN1oIRhvhagK7WHAcrYvyhMnhxrNj6JglL1KytJSSN2FkBEfjVYUKB0nCrPw34vtQkENtADkfgpSutEdksuHS15bD6bQGc3PnQoGGEbq42ieEtB4NKC0AluyvGxeKrFmm8RVPw77U1SUMP4XRHby7fBvj2B4AiLtFmTfq7SJsWeqNARuV3D'

      return frisby.post(`${tgt_origin}`, {
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

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 404)
    })

    it('パスワードが違う', () => {
      const localForm = {
        email: normal.email,
        password: 'hogehoge1'
      }

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 404)
    })
  })

  describe('サインイン成功', () => {
    it('', () => {
      const localForm = {
        email: normal.email,
        password: normal.password
      }

      return frisby.post(`${tgt_origin}`, {
          body: localForm
        })
        .expect('status', 200)
    })
  })
})
