export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo">
            <span className="nav-logo-mark">D</span>
            <span>DermaLux</span>
          </div>
          <p className="footer-tag">
            Dermatología estética premium en Polanco. Dirigida por la Dra. Valentina
            Ríos, miembro de la Sociedad Mexicana de Dermatología.
          </p>
        </div>

        <div>
          <h4>Tratamientos</h4>
          <ul>
            <li><a href="#">Botox &amp; toxina</a></li>
            <li><a href="#">Ácido hialurónico</a></li>
            <li><a href="#">Láser fraccionado</a></li>
            <li><a href="#">Bioestimulación</a></li>
            <li><a href="#">Radiofrecuencia</a></li>
          </ul>
        </div>

        <div>
          <h4>Clínica</h4>
          <ul>
            <li><a href="#doctora">La doctora</a></li>
            <li><a href="#testimonios">Testimonios</a></li>
            <li><a href="#resultados">Resultados</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Aviso legal</a></li>
          </ul>
        </div>

        <div>
          <h4>Contacto</h4>
          <ul>
            <li>
              <a href="#">
                Av. Presidente Masaryk 123
                <br />
                Polanco, CDMX
              </a>
            </li>
            <li><a href="#">+52 55 1234 5678</a></li>
            <li><a href="#">hola@dermalux.mx</a></li>
            <li><a href="#">Lun – Sáb · 9:00 – 19:00</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-base">
        <span>© 2026 DermaLux · Dra. Valentina Ríos. Cédula 1234567</span>
        <span>Diseño DermaLux Studio</span>
      </div>
    </footer>
  );
}
