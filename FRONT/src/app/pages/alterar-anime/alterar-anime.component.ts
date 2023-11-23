import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.models";
import { Anime } from "src/app/models/anime.models";

@Component({
  selector: "app-alterar-anime",
  templateUrl: "./alterar-anime.component.html",
  styleUrls: ["./alterar-anime.component.css"],
})
export class AlterarAnimeComponent {
  animeId: number = 0;
  nome: string = "";
  genero: string = "";
  nota: number | null = null;
  episodios: number | null = null;
  categoriaId: number = 0;
  categorias: Categoria[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let { id } = parametros;
        this.client.get<Anime>(`https://localhost:7083/api/anime/buscar/${id}`).subscribe({
          next: (anime) => {
            this.client.get<Categoria[]>("https://localhost:7083/api/categoria/listar").subscribe({
              next: (categorias) => {
                this.categorias = categorias;

                this.animeId = anime.animeId!;
                this.nome = anime.nome;
                this.genero = anime.genero;
                this.nota = anime.nota;
                this.episodios = anime.episodios;
                this.categoriaId = anime.categoriaId;
              },
              error: (erro) => {
                console.log(erro);
              },
            });
          },
          //Requisição com erro
          error: (erro) => {
            console.log(erro);
          },
        });
      },
    });
  }

  alterar(): void {
    let anime: Anime = {
      nome: this.nome,
      genero: this.genero,
      nota: this.nota!,
      episodios: this.episodios!,
      categoriaId: this.categoriaId,
    };

    console.log(anime);

    this.client.put<Anime>(`https://localhost:7083/api/anime/alterar/${this.animeId}`, anime).subscribe({
      //A requição funcionou
      next: (anime) => {
        this.snackBar.open("Anime alterado com sucesso!!", "E-commerce", {
          duration: 1500,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["pages/anime/listar"]);
      },
      //A requição não funcionou
      error: (erro) => {
        console.log(erro);
      },
    });
  }
}
