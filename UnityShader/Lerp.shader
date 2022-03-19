Shader "Custom/Lerp"
{
    Properties
    {
        _MainTex ("Albedo (RGB)", 2D) = "white" {}
        _MainTex2 ("Albedo (RGB)", 2D) = "white" {}
        _lerpValue ("Lerp Value", Range(0,1)) = 0
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 200

        CGPROGRAM
        #pragma surface surf Standard fullforwardshadows

        sampler2D _MainTex;
        sampler2D _MainTex2;

        struct Input
        {
            float2 uv_MainTex;
            float2 uv_MainTex2;
        };

        float _lerpValue;
        void surf (Input IN, inout SurfaceOutputStandard o)
        {
            fixed4 tex1 = tex2D (_MainTex, IN.uv_MainTex);
            fixed4 tex2 = tex2D (_MainTex2, IN.uv_MainTex2);
            o.Albedo = lerp(tex2.rgb, tex1.rgb, tex1.a);
            o.Alpha = 1;
        }
        ENDCG
    }
    FallBack "Diffuse"
}
