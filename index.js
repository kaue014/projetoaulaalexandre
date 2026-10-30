const {
    inserirAluno, listarAlunos, buscarPorRa,
    buscarPorNome, atualizarAluno, excluirPorRa,
} = require('./meu-node-supabase/supabase');

async function main() {
    try {
        try{
            const novo = await inserirAluno('Maria Silva', '2026001', 'ADS');
            console.log('inserido com sucesso', 'novo');
        }catch (e) {
            console.log('Não inseriu (talvez RA ja exista):', e.message || e);
        }

        const todos = await listarAlunos();
        console.log('Total: ${todos.length}', todos);

        const um = await buscarPorRa('2026001');
        console.log(um ?? 'Não encontrado');

        const atualizados = await atualizarAluno ('2026001', 'Maria Silva', 'Gestão Comercial');
        console.log('atualizados');

        const filtrados = await buscarPorNome('Maria');
        console.log(filtrados);
    } catch (err) {
        console.error('ERRO GERAL:', err.message || err);
    }
}

main();