require('doteenv').config();

const { createClient } =require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY ) {
    throw new Error('configure SUPABASE_URL e SUPABASE_ANON_KEY no .env');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function inserirALuno(nome, ra, curso) {
    const {data, error} = await supabase
    .from('alunos')
    .insert([{ nome, ra, curso}])
    .select()
    .single();

    if (error) throw error;

    return data;
    
}

async function listarAluno() {
    const { data, error } = await supabase
        .from('alunos')
        .select('*')
        .order ('id', { ascending: true});

    if (error) throw error;
    return data;
}

async function buscarPorRa(ra) {
    const { data, error} = await supabase
        .from('alunos')
        .select('*')
        .eq('ra', ra)
        .maybeSingle();

        if (error) throw error;
        return data;
}

async function buscarPorNome(parteNome) {
    const { data, error } = await supabase
        .from('alunos')
        .select('*')
        .ilike('nome', '%${parteNome}%')

        .order('nome', {ascending: true});

        if (error) throw error;
        return data;
    }

    async function atualizarAluno(ra, nome, curso) {
  const campos = {};
  if (nome) campos.nome = nome;
  if (curso) campos.curso = curso;

  if (!Object.keys(campos).length) {
    throw new Error('Informe nome e/ou curso para atualizar');
  }

  const { data, error } = await supabase
    .from('alunos')
    .update(campos)
    .eq('ra', ra)
    .select();

  if (error) throw error;
  return data;
}

async function excluirPorRa(ra) {
  const { data, error } = await supabase
    .from('alunos')
    .delete()
    .eq('ra', ra)
    .select();

  if (error) throw error;
  return data;
}

module.exports = {
    supabase,
    inserirAluno,
    listarAlunos,
    buscarPorNome,
    atualizarAluno,
    excluirPorRa,
};

