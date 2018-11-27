<template>
    <div id="footer">
        <v-footer absoulte height="6%" >
            <v-layout justify-center wrap>
                <v-btn to="/" class="jg footer-link" color="black" flat round>
                    Home
                </v-btn>
                <v-btn to="/" class="jg footer-link" color="black" flat round>
                    공지사항
                </v-btn>
                <v-btn to="/" class="jg footer-link" color="black" flat round>
                    이용규칙
                </v-btn>
                <v-btn to="/" class="jg footer-link" color="black" flat round>
                    개인정보처리방침
                </v-btn>
                <v-flex py-3 text-xs-center black--text xs12>
                    2018 Web System Design 9조 — <strong>A-Dong</strong>
                </v-flex>
            </v-layout>
        </v-footer>
    </div>
</template>
<script>
</script>
<style>

    .footer-link{
      font-weight : normal;
      font-size : 15pt;
    }
</style>