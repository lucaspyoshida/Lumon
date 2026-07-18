# Loop rastreável de Português

Estado canônico em [`STATUS.yaml`](STATUS.yaml). Handoffs duráveis em [`handoffs/`](handoffs/).

Regras operacionais:

- `max_concurrency=1`;
- lock atômico antes de spawn ou transição;
- claim `PRONTO -> EM_EXECUCAO` antes de ativar agente;
- heartbeat e lease de até 50 minutos;
- commit remoto confirmado antes de cada handoff;
- trabalho local não publicado nunca alimenta próximo agente;
- implementação e assets finais continuam bloqueados até autorização explícita.

Fluxo padrão: pedagogo, arquiteto, engenheiro, frontend/design, artista IA, programador após Gate G4, revisores e supervisor.
