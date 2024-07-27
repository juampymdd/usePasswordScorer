import { useEffect, useState } from "react"
import { passwordScorer } from 'password-scorer';
import { Toaster, toast } from 'sonner'


const strongPasswordMessage = (language: string): string => {
  switch (language) {
    case 'en':
      return 'Password is strong'
    case 'es':
      return 'La contraseña es fuerte'
    case 'de':
      return 'Passwort ist stark'
    case 'pt':
      return 'A senha é forte'
    case 'fr':
      return 'Le mot de passe est fort'
    case 'ja':
      return 'パスワードは強力です'
    case 'zh':
      return '密码很强'
    case 'zh_TW':
      return '密碼很強'
    default:
      return 'Password is strong'
  }
}

function App() {

  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [password, setPassword] = useState('')
  const [score, setScore] = useState(0)
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('red')
  const [laking, setLaking] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value)
  }

  const handleColor = (score: number) => {
    switch (score) {
      case 0:
        setColor('red');
        break;
      case 20:
        setColor('orange');
        break;
      case 40:
        setColor('yellow');
        break;
      case 60:
        setColor('lightgreen');
        break;
      case 80:
        setColor('green');
        break;
      case 100:
        setColor('darkgreen');
        break;
      default:
        setColor('red')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toast.dismiss()
    const password = event.target.value
    setPassword(password)
    const { score, description, feedback } = passwordScorer(password, selectedLanguage);
    setScore(score);
    setDescription(description);
    setLaking(feedback);
    feedback.map((item) => {
      toast.error(item, {
        className: 'custom-toast-error'
      })
    })
  }

  useEffect(() => {
    toast.dismiss()
    console.log(selectedLanguage)
    const { score, description, feedback } = passwordScorer(password, selectedLanguage);
    setScore(score);
    setDescription(description);
    setLaking(feedback);

    feedback.map((item) => {
      toast.error(item, {
        className: 'custom-toast-error'
      })
    })
  }, [selectedLanguage])

  useEffect(() => {
    handleColor(score)
  }, [score])

  useEffect(() => {
    if (score === 100) {
      toast.success(strongPasswordMessage(selectedLanguage), {
        className: 'custom-toast-success'
      })
    }
  }, [score, selectedLanguage, password])

  return (
    <main className="container">
      <Toaster expand duration={5000} />
      <div className="form-overlay">
        <section className="form-container">

          <h1>Assess your password strength</h1>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select className="form-control" value={selectedLanguage} onChange={handleChange}>
              <option value="en" selected>English (default)</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="pt">Portuguese</option>
              <option value="fr">French</option>
              <option value="ja">Japanese</option>
              <option value="zh">Simplified Chinese</option>
              <option value="zh_TW">Traditional Chinese</option>
            </select>

          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handleInputChange}
            />
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div className="progress-container">
                <div className="progress" style={{
                  width: `${score}%`,
                  backgroundColor: color
                }}>
                </div>
              </div>
              <p style={{
                textTransform: 'uppercase',
                textAlign: 'center',
                fontWeight: 'bold',
                letterSpacing: '2px',
                color: color
              }}>{description}</p>
            </div>
          </div>
        </section>
      </div>
      
    </main>
  )
}

export default App
