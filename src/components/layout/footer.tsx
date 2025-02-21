export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container grid grid-cols-3 gap-8 py-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
          <p className="text-sm text-muted-foreground">
            Restaurante tradicional com mais de 20 anos de experiência.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <p className="text-sm text-muted-foreground">
            Email: contato@restaurante.com
          </p>
          <p className="text-sm text-muted-foreground">Tel: (11) 1234-5678</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/politica-privacidade"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a
                href="/termos"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Termos de Uso
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © 2024 RestaurantApp. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
