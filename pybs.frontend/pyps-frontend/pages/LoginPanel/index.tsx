import React, { useState } from 'react';

const LoginPanel: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Burada gerçek bir kimlik doğrulama işlemi gerçekleştirebilirsiniz.
    // Örneğin, sabit bir kullanıcı adı ve şifre ile karşılaştırabilirsiniz.
    if (username === 'kullanici' && password === 'sifre') {
      setLoggedIn(true);
    } else {
      alert('Kullanıcı adı veya şifre yanlış.');
    }
  };

  if (loggedIn) {
    return <div>Giriş başarılı! Hoş geldiniz.</div>;
  }

  return (
    <div>
      <h1>Giriş Yap</h1>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
};

export default LoginPanel;
